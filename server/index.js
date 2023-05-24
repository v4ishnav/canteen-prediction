const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const saleRoutes = require("./routes/sale.js")
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000

app.use("/sales",saleRoutes)
app.get('/',(req,res)=>{
    res.send("Canteen app")
})

const API_KEY = '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'

app.post('/prediction',async(req,res)=>{
    const {message} = req.body
    const options = {
        method:"POST",
        headers:{
            "Authorization":`Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify({ 
            model: "gpt-3.5-turbo",
            messages:[{role:'user',content:message}],
            max_tokens:200,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const reply = await response.json()
        res.send(reply.choices[0].message.content)
        console.log(reply.choices[0].message.content);
    } catch (error) {
        console.log(error);
    }
    
    })

mongoose.connect("mongodb+srv://jabbar:jabbar@sales.pkdjete.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        app.listen(port, err => {
            if (err)
                throw err
            console.log('Server listening on port', port)
        })
    });
