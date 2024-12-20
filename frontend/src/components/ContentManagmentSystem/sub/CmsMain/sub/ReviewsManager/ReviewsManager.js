import './ReviewsManager.css'
import {useEffect, useState} from "react";
import ReviewSquare from "./sub/Review/ReviewSquare";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ReviewsManager() {
    const [reviews, setReviews] = useState([])
    const [sortType, setSortType] = useState("A-Z")

    async function fetchReviews() {
        const response = await fetch(process.env.REACT_APP_API_ADMIN_GET_REVIEWS,
            {
                method: 'GET',
            })
        const data = await response.json()
        setReviews(data);
    }

    const handleChange = (event) => {
        setSortType(event.target.value)
    }

    useEffect(() => {
        fetchReviews();
    }, [])

    return <div id='reviews-manager-container'>
        <div id="reviews-manager-container-top">
            <input type='text' id='reviews-manager-input' placeholder='Nazwa..'/>
            <FormControl sx={{width: 0.16, height: 0.45, borderRadius: 25}}>
                <InputLabel id="demo-simple-select-label">Sortowanie</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortType}
                    label="Sortowanie"
                    onChange={handleChange}
                    sx={{width: 1, height: 1}}

                >
                    <MenuItem value={"A-Z"}>Po nazwie (A-Z)</MenuItem>
                    <MenuItem value={"Z-A"}>Po nazwie (Z-A)</MenuItem>
                    <MenuItem value={"score min-max"}>Pukntacja (Od najniższej)</MenuItem>
                    <MenuItem value={"score max-min"}>Punktacja (Od najwyższej)</MenuItem>
                    <MenuItem value={"date min-max"}>Data dodania (Od najniższej)</MenuItem>
                    <MenuItem value={"date max-min"}>Data dodania (Od najwyższej)</MenuItem>
                </Select>
            </FormControl>
        </div>
        <di id='reviews-manager-container-bottom'>

            <div className='reviews-manager-column'>
                {reviews.length > 0 ? reviews.map((review, index) => {
                    return index % 4 == 1 ? <ReviewSquare key={index} review={review}/> : null
                }) : <></>}
            </div>
            <div className='reviews-manager-column'>
                {reviews.length > 0 ? reviews.map((review, index) => {
                    return index % 4 == 2 ? <ReviewSquare key={index} review={review}/> : null
                }) : <></>}
            </div>
            <div className='reviews-manager-column'>
                {reviews.length > 0 ? reviews.map((review, index) => {
                    return index % 4 == 3 ? <ReviewSquare key={index} review={review}/> : null
                }) : <></>}
            </div>
            <div className='reviews-manager-column'>
                {reviews.length > 0 ? reviews.map((review, index) => {
                    return index % 4 == 0 ? <ReviewSquare key={index} review={review}/> : null
                }) : <></>}
            </div>
        </di>
    </div>
}