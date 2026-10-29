import User from "./models/User.js"
import Department from "./models/Department.js"
import bcrypt from "bcrypt"
import connectToDatabase from "./database/db.js";

const userRegister = async () => {
  try {
    await connectToDatabase();
    const hashedPassword = await bcrypt.hash("1", 10);
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log("Admin password updated successfully");
    } else {
      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin"
      });
      await newUser.save();
      console.log("Admin user created successfully");
    }

    const deptCount = await Department.countDocuments();
    if (deptCount === 0) {
      const defaultDepartments = [
        { dep_name: "Human Resources", description: "HR and Recruitment" },
        { dep_name: "Engineering", description: "Software and Product Development" },
        { dep_name: "Finance", description: "Accounting and Finance" },
        { dep_name: "Marketing", description: "Sales and Marketing" },
        { dep_name: "Operations", description: "Business Operations" },
      ];
      await Department.insertMany(defaultDepartments);
      console.log("Default departments created successfully");
    } else {
      console.log(`Departments already exist (${deptCount} found)`);
    }

    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

userRegister();