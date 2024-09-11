import qs from "qs";

export const generateQS = (obj: any) => {
  let str = qs.stringify(obj);
  return str;
};

export const parseQS = (data: any) => {
  let filter = {
    search: data.search ? data.search : "",
    min: data.min ? data.min : 0,
    max: data.max ? data.max : 0,
    seed: data.seed == "true" ? true : false,
    fertilizer: data.fertilizer == "true" ? true : false,
    sapling: data.sapling == "true" ? true : false,
    pesticide: data.pesticide == "true" ? true : false,
  };

  return filter;
};
