import { configureStore } from "@reduxjs/toolkit";
import FilterReducer from "./Reducers/ECommerce/FilterReducer";
import ProductReducer from "./Reducers/ECommerce/ProductReducer";
import HeaderBookmarkSlice from "./Reducers/Layout/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/Layout/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    headerBookMark: HeaderBookmarkSlice,
    product: ProductReducer,
    filter: FilterReducer,
    themeCustomizer: ThemeCustomizerSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
