// paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        cardholderName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    },
    reducers: {
        updateField(state: any, action) {
            const { field, value } = action.payload;
            state[field] = value;
        },
        clearForm(state) {
            state.cardholderName = '';
            state.cardNumber = '';
            state.expirationDate = '';
            state.cvv = '';
        },
    },
});

export const { updateField, clearForm } = paymentSlice.actions;

export default paymentSlice.reducer;
