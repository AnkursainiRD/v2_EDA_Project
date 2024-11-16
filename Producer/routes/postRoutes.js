import express from 'express'
import { creatPostService } from '../services/postService.js'
const router=express.Router()

router.route("/create-post").post(creatPostService)

export default router;