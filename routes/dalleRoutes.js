import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';


dotenv.config();


const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send('helloooooooooo')
})


router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        // const encodedParams = new URLSearchParams();
        // encodedParams.set('text', prompt);

        const options = {
            method: 'POST',
            url: 'https://texttoimage.p.rapidapi.com/image',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'd1d96b2941mshe5211115797318dp1131e9jsn08cee67d088e',
                'X-RapidAPI-Host': 'texttoimage.p.rapidapi.com'
            },
            data: {
                search_text: prompt,
                num_images: 5,
                pro_blog: true
            }
        };

        // const options = {
        //     method: 'POST',
        //     url: 'https://open-ai21.p.rapidapi.com/texttoimage2',
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         'X-RapidAPI-Key': 'd1d96b2941mshe5211115797318dp1131e9jsn08cee67d088e',
        //         'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
        //     },
        //     data: encodedParams,
        // };

        const response = await axios.request(options);
        console.log(response.data);
        const image = response.data.body.images.filter((item) => item.mime === 'image/jpeg')
        console.log(image);
        res.status(200).json({ photo: image[0].link })
        console.log(image[0].link);
        // let waitTime;
        // if (response.data.url.ETA) {
        //     waitTime = Number(res.data.ETA.substring(0, 2))
        // } else {
        //     waitTime = 15000;
        // }
        // setTimeout(() => {
        //     res.status(200).json({ photo: image })
        // }, waitTime)


        // const { prompt } = req.body;

        // const response = await openai.createImage({
        //     prompt: prompt,
        //     n: 1,
        //     size: "1024x1024",
        // });


        // const image = response.data.data[0].url;

        // res.status(200).json({ photo: image })
    } catch (error) {
        console.log(error?.response?.data?.error);
        res.status(500).send(error?.response?.data?.error?.message || "An error occurred");
    }
})


export default router;