import mongoose from 'mongoose';

const bannerSchema = mongoose.Schema({
    banner1:[
        {
            image: { type: String, required: true },
            url: { type: String, required: true },
            // created_by : {
            //     type: mongoose.Schema.Types.ObjectId,
            //     required: true,
            //     ref : 'User'
            // },
            created_on : {
                type: Date,
            },
        }
    ],
    banner2:[
        {
            image: { type: String, required: true },
            url: { type: String, required: true },
            // name: { type: String, required: true },
            shortDesc: { type: String, required: true },
            // created_by : {
            //     type: mongoose.Schema.Types.ObjectId,
            //     required: true,
            //     ref : 'User'
            // },
            created_on : {
                type: Date,
            },
        }
    ]
    
},{
    timestamp: true
})

const Banner = mongoose.model('Banner', bannerSchema)

export default Banner