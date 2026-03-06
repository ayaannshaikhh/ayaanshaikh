# Tutorial on Making Your Portfolio Accessible via SSH
## Requirements
- A domain
  - For example: I used Cloudflare Registrar to purchase my domain
- A virtual private server (VPS)
  - For example: I used OVHcloud to purchase a VPS (Ubuntu 25.04)

# Initial Setup
1. Understand how you would want users to remotely connect to your VPS to be able to see your portfolio
> In my case, I used the domain `ssh.ayaanshaikh.ca` and set up a DNS record on Cloudflare
>
> Use the IPv4 address provided by the VPS in the DNS record
2. Convert your portfolio into a .js file (I used Claude to do this)
> Add the following line on the top of the .js file:
```bash
#!/usr/bin/env node
```
3. Create your `portfolio.js` file and upload it to the root/home of your remote server
# Series of Commands
1. `sudo useradd -m portfolio` → creates the user that users will use to connect to the server (use any appropriate name)

2. `sudo nano /usr/local/bin/portfolio-shell` → write the wrapper script to run portfolio instead of shell
```bash
#!/bin/bash
exec node /home/portfolio/portfolio.js
```
4. `sudo chmod +x /usr/local/bin/portfolio-shell` → turns it into an executable

5. `echo "/usr/local/bin/portfolio-shell" | sudo tee -a /etc/shells` → adds a valid login

6. `sudo usermod -s /usr/local/bin/portfolio-shell portfolio` → swaps Bash with portfolio when someone connects via SSH

7. `sudo cp ~/portfolio.js /home/portfolio/portfolio.js` → copies portfolio from home directory 

8. `sudo chown portfolio:portfolio /home/portfolio/portfolio.js` → changes ownership of file to portfolio

9. `sudo nano /etc/ssh/sshd_config` → SSH configuration & limits shell access and other security vulnerabilities
    
    **In this file, add the following:**
    ```bash
    Match User portfolio
      PasswordAuthentication yes
      PermitEmptyPasswords yes
      AllowTcpForwarding no
      X11Forwarding no
      PermitTunnel no
      GatewayPorts no
      AllowAgentForwarding no
    ```
10. `sudo passwd -d portfolio` → disable password
11. `sudo systemctl restart sshd` → restart
12. `sudo chmod -x /etc/update-motd.d/*` → disables MOTD upon SSH connection

This is how I did it! There might be other, easier ways, so if you do know how to, let me know!
