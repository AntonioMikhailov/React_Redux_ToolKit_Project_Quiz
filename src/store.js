import { configureStore } from "@reduxjs/toolkit";
import QuizSlice from "./QuizSlice";

export const store = configureStore({
reducer: {
  QuizSlice: QuizSlice  
}
})
 
