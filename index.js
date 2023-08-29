const express = require("express")
const app = express()
const Razorpay = require("razorpay")
const cors = require("cors")
const { v4: uuidV4 } = require("uuid")
const path = require("path")

const PORT = 5000

const razorpay = new Razorpay({
    key_id: 'rzp_test_k6kq6z50ufTArD',
    key_secret: 'K6BBDtROOLCHzwvQhsNV73Q9'
})

app.use(express.json())
app.use(cors())

app.get("/logo.jpg", (req, res) => {
    res.sendFile(path.join(__dirname, "logo.jpg"))
})

// console.log(path.join(__dirname, "logo.jpg"))

app.post("/razorpay", async (req, res) => {
    const payment_capture = 1
    const amount = Number(req.body.totalAmount)
    const currency = "INR"

    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: uuidV4(),
        payment_capture: 1
    }

    try {
        const response = await razorpay.orders.create(options)
        // console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }
})

app.post("/successful", (req, res) => {
    res.redirect(301, "https://myntracl0ne.netlify.app//success")
})

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT", PORT)
})