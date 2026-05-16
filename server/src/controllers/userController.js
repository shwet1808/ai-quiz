import { asyncHandler } from '../utils/asyncHandler.js';
import { getProfileForUser, getHistoryForUser } from '../services/userService.js';

export const getUserProfile = asyncHandler(async (req, res) => {
  const profile = await getProfileForUser(req.params.username);
  res.json({ success: true, profile });
});

export const getUserHistory = asyncHandler(async (req, res) => {
  const history = await getHistoryForUser(req.params.username);
  res.json({ success: true, history });
});
