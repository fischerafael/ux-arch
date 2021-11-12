import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  project_type: String,
  user_id: String,
  project_name: String,
  project_location: String,
  project_image: String,
  client_birth: Number,
  client_gender: Number,
  shape_height: Number,
  shape_size: Number,
  shape_elements: Number,
  shape: Number,
  shape_materials: Number,
  shape_texture: Number,
  shape_tone: Number,
  shape_primary_color: Number,
  shape_secondary_color: Number,
  shape_tertiary_color: Number,
  shape_light: Number,
  shape_contrast: Number,
  shape_opennings: Number,
  users_movement: Number,
  user_qty: Number,
  context: Number,
  context_is_landmark: Number,
  context_is_context_landmark: Number,
  time: Number,
  time_weather: Number,
  time_temperature: Number,
  xp_actual: Number,
  xp_predicted: Number,
});

export const Project =
  mongoose.models.Project || mongoose.model("Project", Schema);
