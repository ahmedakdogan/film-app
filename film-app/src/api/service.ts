import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk("characters/getCharacters",async (page:any)=>{
    const response = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=12&offset=${page*12}`);
    return response.data;
});

