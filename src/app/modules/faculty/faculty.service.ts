import { facultyModel } from "./faculty.model";

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  const facultySearchableFields = ["email", "name.firstName", "presentAddress"];
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = facultyModel.find({
    $or: facultySearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  //filtering
  const excludeFields = ["searchTerm"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery.find(queryObj).populate("academicDepartment");



  //sorting
  let sort = "-createdAt";
  if(query?.sort){
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort)


//limit and pagination:
let page = 1;
let limit = 10;
let skip = 0;

if(query?.limit){
    limit = Number(query?.limit);
}

if(query.page){
    page = Number(query.page);
    skip = (page - 1) * limit;
}

const paginationQuery = sortQuery.skip(skip);
const limitQuery = paginationQuery.limit(limit)


//fields query:

let fields = "-__v";

if(query.fields){
    fields = (query?.fields as string).split(",").join(" ")
}

const fieldQuery = await limitQuery.select(fields)

 return fieldQuery;
};




export const facultiesServices = {
getAllFacultiesFromDB
}
