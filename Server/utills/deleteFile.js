import path from "path"; 
import fs from "fs";
export const deleteFile = (filePath) => {
  if (filePath) {
    const fullPath = path.join("public", filePath.replace("/uploads/", "uploads/"));
    fs.unlink(fullPath, (err) => {
      if (err) console.log("Failed to delete file:", fullPath);
    });
  }
};