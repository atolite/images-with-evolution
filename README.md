# using evolution to make useless things

[Spu7Nix made a video](https://www.youtube.com/watch?v=6aXx6RA1IK4&t=396s) on putting images/videos into geometry dash with this same algorithm, and after watching it i immediately sole his idea because everything that can be made in javascript eventually will be.

The principle behind it is using a small amount of shapes to represent an image as opposed to a bitmap.

For the sake of the school computer I quickly coded this on, it doesn't generate as many shapes as it could.
The process is as follows:

- Make a lot of random shapes. The traits that can be changed are size and rotation
- These shapes are ranked based on how "good" they are (which is how much they contribute to the color difference between images)
- The top 10 or so survive and get to have children, who have slight variations in their traits
- We do this a few times. sort everyone, make children, etc 
- Then the winner is picked, which is the shape with the highest score out of all of the others. 
- Now we have a single shape on the screen.


Warning: This thing is  s l o w. Like 40 sec on average PER SHAPE for a full screen render.
If you wanna use this dumpsterfire, use small images. 

## ooh look the examples wait why are they all garfield

(this one took a whole 40 minutes to render!! sped up by 256x) also casually linking my sromg comics lol
![image](https://user-images.githubusercontent.com/59059735/233543431-49b846ff-df19-4b22-ae42-16188bad153f.gif)

![image](https://user-images.githubusercontent.com/59059735/233544139-699013a5-39d4-4b03-ab09-422a26a51bc0.png)

and here we see the majestic garfield phone. no idea how long it took

![image](https://user-images.githubusercontent.com/59059735/233543058-fa7367a0-cf6c-4958-a5e3-1b4fabc240fc.png)
![image](https://user-images.githubusercontent.com/59059735/233543099-c0a695d8-13d5-48de-9faf-f327cebee3c1.png)
