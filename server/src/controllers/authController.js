import { asyncHandler } from '../utils/asyncHandler.js';
import { findOrCreateUser } from '../services/userService.js';

export const loginUser = asyncHandler(async (req, res) => {
  const user = await findOrCreateUser(req.body.name);
  res.json({ success: true, user });
});
