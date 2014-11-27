Spot Price Ticker
==========

node.js app to actively display current spot prices

We designed this to be used on a Raspberry Pi, so instructions for our setup of the Pi are below. 

http://www.xmlcharts.com/precious-metals.html

Raspberry Pi Setup:
-

Install your updates

    $ sudo apt-get update && sudo apt-get upgrade

// Download the latest 'spotticker' repo from

// https://github.com/davidjosephhayes/spotticker into your home

// folder (/home/pi)

    $ git clone https://github.com/davidjosephhayes/spotticker

// Copy the contents from 'spotticker' and paste them into the home drive and then remove the 'spotticker' folder to tidy up the home folder
    
    $ cp /spotticker* /home/pi
    $ rm /spotticker -rf

Disable the Raspberry Pi from going to sleep (This currently isn't working and needs a different solution)

    $ cd /etc/lightdm
    $ sudo nano lightdm.conf

Scroll down to the 'Seat defaults' section and enable 'xserver-command = X -s 0 -dpms' by deleting the # before it after. When you're finished, click ^X, Y, and hit Enter to save your changes

Disable the mouse from appearing on Boot by installing the program 'unclutter'

    $ sudo apt-get install unclutter

Autostart Node.js by navigating to the rc.locale folder and adding the following lines. Colors will change in the nano editor if done correctly.

    $ cd /etc/rc.local
    $ sudo nano rc.local

Add the following lines before the 'exit 0' text

    $ touch /home/pi/index.js
    $ su pi -c 'node /home/pi/index.js < /dev/null &'

Autostart Midori and have it navigate to a specific URL. First, navigate to the 'autostart' file and open it:

    $ cd /etc/xdg/lxsession/LXDE
    $ sudo nano autostart

Second, comment out the first three lines, and add these other lines. When completed, it should look like the following:

    #@lxpanel --profile LXDE
    #@pcmanfm --desktop --profile LXDE
    #@xscreensaver -no-splash
    @xset s off
    @xset -dpms
    @xset s noblank
    @unclutter -idle 0.1 -root
    sleep 60
    @midori -e Fullscreen -a http://localhost:1337

When you're finished, click ^X, Y, and hit Enter to save your changes

The Wifi can be configured one of two ways. If you have only one network you will be using, read the the next few steps under 'Single Wifi Configuration' Otherwises, jump to 'Multiple Wifi Configuration'
 
Single Wifi Configuration: 

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

Multiple WiFi Configuration:
Setup Wifi Configuration for the Raspberry Pi like the following if you have multiple wifi networks. This will also let the Raspberry Pi connect on boot without the need for an ethernet cable
 
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
Restart the pi and wait for it to automatically startup 
Midori to the correct URl now
