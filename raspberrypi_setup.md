Raspberry Pi Setup for each Spotticker Instance:

// 	Install your updates
$	sudo apt-get update && sudo apt-get upgrade

// 	Download the latest 'spotticker' repo from https://github.com/davidjosephhayes/spotticker into your home folder (/home/pi)
$	git clone https:github.com/davidjosephhayes/spotticker

// 	Copy the contents from 'spotticker' and paste them into the home drive and then remove the 'spotticker' folder to tidy up the home folder
$ 	cp /spotticker* /home/pi
$ 	rm /spotticker -rf

// 	Disable the Raspberry Pi from going to sleep
$	cd /etc/lightdm
$ 	sudo nano lightdm.conf
// 	Scroll down to the 'Seat defaults' section and enable 'xserver-command = X -s 0 -dpms' by deleting the # before it after
// 	When you're finished, click ^X, Y, and hit Enter to save your changes

// 	Disable the mouse from appearing on Boot by installing the program 'unclutter'
$ 	sudo apt-get install unclutter

// 	Autostart Node.js by navigating to the rc.locale folder and adding the following lines:
$	touch /home/pi/index.js 
$	su pi -c 'node /home/pi/index.js < /dev/null &'


//	Autostart Midori and have it navigate to a specific URL
//	First, navigate to the 'autostart' file and open it

$ 	cd /etc/xdg/lxsession/LXDE
$ 	sudo nano autostart

//	Second, comment out the first three lines, and add these other lines. When completed, it should look like the following: 

#@lxpanel --profile LXDE
#@pcmanfm --desktop --profile LXDE
#@xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank
@unclutter -idle 0.1 -root
sleep 60
@midori  -e Fullscreen -a http://localhost:1337

// 	When you're finished, click ^X, Y, and hit Enter to save your changes

// 	Restart the pi and wait for it to automatically startup Midori to the correct URl now
$	sudo reboot


