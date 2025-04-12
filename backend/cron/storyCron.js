const cron = require("node-cron");
const Story = require("../models/storyModel")
const User = require("../models/userModel")
const cloudinary=require("cloudinary").v2;

cron.schedule("*/10 * * * * *", async () => {
    try {
      const now = new Date();
      const expiredStories = await Story.find({ expiresAt: { $lte: now } });
  
      for (const story of expiredStories) {
        // Removed from Cloudinary
        await cloudinary.uploader.destroy(story.publicId);

        console.log("this is user id",story.postedBy)
  
        // Removed from user's stories array
       const updatedUser = await User.findByIdAndUpdate(story.postedBy, {
          $pull: { stories: story._id }
        },{new:true});

        if(updatedUser)console.log("user has been updated with stories getting deleted!!!")
        else console.log("user hasnt been updated with stories getting deleted!!")

        await Story.findByIdAndDelete(story._id);
  
        console.log(`Cleaned expired story ${story._id}`);
      }
    } catch (err) {
      console.error("Cron cleanup error:", err);
    }
  });         
