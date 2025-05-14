import { createSlice } from "@reduxjs/toolkit"

const filterSlice  = createSlice({
    name:"filter",
    initialState:{  filterProducts: [],  searchval: "", catval: [],
        selectedBrands: [],   priceRange: [0, 10000]},
    reducers:{
        APPLY_FILTER(state,action){
            let {products ,  category,    brands,priceRange, search} = action.payload
            let filteredProducts = products;

            if (search) {
                filteredProducts = filteredProducts.filter(item =>item.name.toLowerCase().includes(search.toLowerCase()) )}
        

            if (category.length > 0) {    filteredProducts = filteredProducts.filter(item => category.includes(item.category));  }

            if (brands.length > 0) {  filteredProducts = filteredProducts.filter(item => brands.includes(item.brand));   }
            
           if (priceRange) {
                    filteredProducts = filteredProducts.filter(
                      item => item.price >= priceRange[0] && item.price <= priceRange[1])}
            
            state.filterProducts =  filteredProducts
            state.catval = category
            state.selectedBrands = brands
            state.priceRange = priceRange
            state.searchval = search
        }
    }
})
export const {APPLY_FILTER} = filterSlice.actions
export default filterSlice
export const selectFilterProducts = state=>state.filter.filterProducts
export const selectSearchVal = state=>state.filter.searchval
export const selectCategory = state=>state.filter.catval
export const selectBrands = state=>state.filter.selectedBrands
export const selectPrice = state=>state.filter.priceRange