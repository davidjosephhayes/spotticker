Brief Readme to install Node.js and Socket.io on the Raspberry pi condensed from the instructions on  
http://weworkweplay.com/play/raspberry-pi-nodejs/ 
-Adrian Sanabria-Diaz

Once the Raspberry Pi has been set up with the Raspbian, 
run the following commands in the terminal to Download and install an ARM version of Node.js:

wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb

// I ran into an error that was resolved after running the following command: 

npm install socket.io

//Automatically turn on node.js on boot

Last Modified 11/22/2014
-Ade