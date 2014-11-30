Spot Price Ticker
==========

node.js app to actively display current spot prices

We designed this to be used on a Raspberry Pi, so instructions for our setup of the Pi are below. 

http://www.xmlcharts.com/precious-metals.html


<h2>Raspberry Pi Setup:</h2>

The only preconditions for this setup is that you currently have a Raspberry Pi model B or above with internet access, and have Raspbian Debian Wheezy installed. If not, here is the download link for the SD Card images: http://www.raspberrypi.org/downloads/ 

<h3>Step One: Update your Kernal</h3>

    $ sudo apt-get update && sudo apt-get upgrade
    
<h3>Step Two: Download the Spotticker Repo</h3>
    
Download the latest 'spotticker' repo from https://github.com/davidjosephhayes/spotticker into your home folder (/home/pi):

    $ git clone https://github.com/davidjosephhayes/spotticker

<h3>Step Three: Disable Pi display from going to blank</h3>
My work around involves installing the X Window System and then updating a file that affects the environment:

    $ sudo apt-get install x11-xserver-utils install

When you're done installing the X Window System on the Raspberri Pi, direct yourself to the lightdm directory:

    $ cd /etc/lightdm
    $ sudo nano lightdm.conf

Scroll down the file and enable the line that says:
    
    # Seat defaults
    #
    #xserver-command = X -s 0 -dpms

to:

    # Seat defaults
    #
    xserver-command = X -s 0 -dpms #Took out the comment

by ommitting the '#' that comments it out. Next, reboot the system and log in with your credentials:

    $ sudo reboot
    
Final thing is to disable the 'Display Power Management Signalling' and screensaver from the 'autostart' file in the LXDE folder. 

    $ cd /etc/xdg/lxsession/LXDE
    $ sudo nano autostart
    
This will show the following text: 

    @lxpanel --profile LXDE
    @pcmanfm --desktop --profile LXDE
    @xscreensaver -no-splash

Add the following lines inside the 'autostart' file:

    @xset s off
    @xset -dpms
    @xset s noblank
    
And save the 'autostart' file now that its contents contain the following:

    @lxpanel --profile LXDE
    @pcmanfm --desktop --profile LXDE
    @xscreensaver -no-splash
    @xset s off
    @xset -dpms
    @xset s noblank

<h3>Step Four: Disable mouse appearance on boot</h3>
Next up, let's disable the mouse from appearing on Boot by installing the program 'unclutter':

    $ sudo apt-get install unclutter
    
And then navigating to the LXDE folder to make a line change so the Raspberry Pi knows to initiate the program on boot:
    
    $ cd /etc/xdg/lxsession/LXDE
    $ sudo nano autostart
    
Add the final line '@unclutter -idle 0.1 -root' to the end of the file:

    @lxpanel --profile LXDE
    @pcmanfm --desktop --profile LXDE
    @xscreensaver -no-splash
    @xset s off
    @xset -dpms
    @xset s noblank
    @unclutter -idle 0.1 -root
    
Be sure to save by pressing ^X. 

<h3>Step Five: Midori Browser startup on boot</h3>
Like the previous instruction with the 'unclutter' program, we'll need Midori to automatically start as well. Let's autostart Midori and have it navigate to 'https://localhost:1337'. First, navigate to the 'autostart' file and open it:

    $ cd /etc/xdg/lxsession/LXDE
    $ sudo nano autostart

Add the lines that tell the Pi to wait for 5 seconds, and then to start the Midori browser. When completed, the 'autostart' file should look like the following:

    @lxpanel --profile LXDE
    @pcmanfm --desktop --profile LXDE
    @xscreensaver -no-splash
    @xset s off
    @xset -dpms
    @xset s noblank
    @unclutter -idle 0.1 -root
    sleep 5
    @midori -e Fullscreen -a http://localhost:1337

Be sure to save your changes!

<h3>Step Six: Enabling Node.js to start on boot</h3>
The 'spotticker' app depends on the Node.js. Let's have Node run at boot by having it automatically start. This file is in a different location than where we added the Midori and Unclutter actions:

    $ cd /etc/
    $ sudo nano rc.local

Add the following lines before the 'exit 0' text:

    $ su pi -c 'node /home/pi/spotticker/index.js < /dev/null &'

<h3>Step Seven: Wifi Configuration</h3>

We recommend wireless communication between the Raspberry Pi and your network if you have the Pi in an area where a Ethernet cable can't reach. The Wifi can be configured one of two ways. If you have only one network you will be using, read the the next few steps under 'Single Wifi Configuration' Otherwises, jump to 'Multiple Wifi Configuration'

<h4>Single Wifi Configuration:</h4> 

    $ sudo nano /etc/network interfaces

Change your code inside this file to read the following with your SSID and Password name filled in:

    auto lo
     
    iface lo inet loopback
    iface eth0 inet dhcp
     
    allow-hotplug wlan0
    auto wlan0
     
     
    iface wlan0 inet dhcp
    wpa-ssid "ssid"
    wpa-psk "password"

<h4>Multiple WiFi Configuration:</h4>
Setup Wifi Configuration for the Raspberry Pi like the following if you have multiple wifi networks. This will also let the Raspberry Pi connect on boot without the need for an ethernet cable:
 
    $  cd /etc/wpa_supplicant/
    $  sudo nano wpa_supplicant.conf

Add the id "id_str="business" (could be anything, but something you can identify easy. To have your code look like the following just add the id in there after the ssid and psk:

    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    update_config=1

    network={
        ssid= NETWORK NAME"
        psk="PASSWORD"
        id_str="test"
    }

    network={
        ssid="HOME NETWORK NAME"
        psk="HOME PASSWORD"
        id_str="home"
    }

    network = {
        ssid="BUSINESS NETWORK NAME"
        psk="BUSINESS PASSWORD"
        id_str="business


Hit ^X to save your changes and yes, and then enter

Now navigate to /etc/network/ and sudo nano interfaces and edit the code to make it read like the following: 

---------------------------------------------------------------

    auto lo

    iface lo inet loopback
    iface eth0 inet dhcp

    allow-hotplug wlan0
    iface wlan0 inet manual
    wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf

    iface test inet static
    address <test address>
    gateway <business gateway>
    netmask <business netmask>


    iface business inet static
    address <business address>
    gateway <business gateway>
    netmask <business netmask>

    iface home inet static
    address <home address>
    gateway <home gateway>
    netmask <home netmask>

Hit ^X to save your changes, and yes, and then enter

<h2>That's it!</h2>
Let's reboot your Raspberry Pi:

    $ sudo reboot
