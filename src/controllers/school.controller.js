import pool from "../db/connection.js";
import { calculateDistance } from "../utils/calculateDistance.js";

export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  //Checking if values are present
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required." });
  }

  //If latitude and longitude are not in Float then DB will throw error, so no need to validate
  try {
    const [result] = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({ message: "School added successfully.", data: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Database error.", error: error.message });
  }
};

export const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  //Checking if values are present
  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude are required." });
  }

  try {
    const [schools] = await pool.query("SELECT * FROM schools");
    
    //Calculating, mapping and Sorting data
    const sortedSchools = schools.map((school) => ({
      ...school,
      distance: calculateDistance(latitude, longitude, school.latitude, school.longitude),
    })).sort((a, b) => a.distance - b.distance);

    res.status(200).json({message: 'success', data: sortedSchools});
  } catch (error) {
    res.status(500).json({ message: "Database error.", error: error.message });
  }
};
