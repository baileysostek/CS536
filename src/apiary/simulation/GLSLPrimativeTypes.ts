export type GLSLPrimativeType = {
  type_name      : string, // Name of the Primative
  size_in_floats : number  // Number of floats it takes to represent this datatype. We use this to compact agent data into a Uniform Buffer Object (UBO).
}

export const GLES_FLOAT : GLSLPrimativeType = {
  type_name : "FLOAT",
  size_in_floats : 1,
}

export const GLES_VECTOR_2 : GLSLPrimativeType = {
  type_name : "VEC2",
  size_in_floats : 2,
}

export const GLES_VECTOR_3 : GLSLPrimativeType = {
  type_name : "VEC3",
  size_in_floats : 3,
}

export const GLES_VECTOR_4 : GLSLPrimativeType = {
  type_name : "VEC4",
  size_in_floats : 4,
}

export const GLES_MATRIX_2_2 : GLSLPrimativeType = {
  type_name : "MAT2",
  size_in_floats : 4,
}

export const GLES_MATRIX_3_3 : GLSLPrimativeType = {
  type_name : "MAT3",
  size_in_floats : 9,
}

export const GLES_MATRIX_4_4 : GLSLPrimativeType = {
  type_name : "MAT4",
  size_in_floats : 16,
}