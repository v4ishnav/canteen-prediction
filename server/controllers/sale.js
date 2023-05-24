const mongoose = require('mongoose')
const SaleSchema = require("../model/saleSchema.js")

exports.addSale = async(req,res)=>{
    const sale = req.body
    const newSale= new SaleSchema(sale)
        try {
            newSale.save()
            res.status(201).json(newSale);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
}

exports.getSales = async(req,res)=>{
    await SaleSchema.find().then((docs)=>{
        res.send(docs)
    }).catch((err)=>{
        console.log(err);
    })
}

