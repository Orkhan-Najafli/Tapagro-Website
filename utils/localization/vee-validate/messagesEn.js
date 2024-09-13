export default {
  _default: (field) => `${field} göstəricisi yanlışdır.`,
  after: (field, [target, inclusion]) =>
    `${field} yalnız ${target} tarixindən sonra${
      inclusion ? `, və ya ${target} tarixində ` : " "
    }olmalıdır.`,
  alpha: (field) => `This field must contain only letters.`,
  alpha_dash: (field) =>
    `${field} must contain only letters, numbers and the hyphen`,
  // alpha_num: (field) => `${field} yalnız rəqəmlərdən ibarət olmalıdır`,
  alpha_num: (field) => `${field} must contain only letters and numbers`,

  alpha_spaces: (field) =>
    `This field must contain only letters and the space bar`,
  before: (field, [target, inclusion]) =>
    `${field} yalnız ${target} tarixindən öncə${
      inclusion ? `, və ya ${target} tarixində ` : " "
    }olmalıdır.`,
  between: (field, [min, max]) =>
    `${field} must be between ${min} and ${max} only.`,

  confirmed: (field) => `${field} təsdiqləməsi yanlışdır.`,
  credit_card: (field) => `${field} göstəriciləri düzgün daxil olunmayıb.`,
  date_between: (field, [min, max]) =>
    `${field} ${min} və ${max} arası olmalıdır.`,
  date_format: (field, [format]) => `${field} ${format} formatında olmalıdır.`,
  decimal: (field, [decimals = "*"] = []) =>
    `This field must contain only numbers${
      !decimals || decimals === "*"
        ? ""
        : ` after the point ${decimals} decimal digits`
    }.`,

  digits: (field, [length]) => `${field} ${length} must contain numbers.`,
  dimensions: (field, [width, height]) =>
    `${field} ölçüsü ${width}x${height} piksel olmalıdır.`,
  email: (field) => `${field} must be entered in the correct format`,
  excluded: (field) => `You can not select the same`,
  ext: (field) => `${field} must be in the correct file format`,
  image: (field) => `${field} must be an image`,
  included: (field) => `${field} göstəricisi yanlışdır.`,
  integer: (field) => `${field} must be an integer `,
  ip: (field) => `${field} IP ünvanı düzgün formatda daxil olunmayıb.`,
  length: (field, [length, max]) => {
    if (max) {
      return `${field} length must be between ${length} and ${max}.`;
    }
    return `${field} length must be ${length}.`;
  },
  max: (field, [length]) =>
    `This ${field} length must contain maximum ${length} symbols`,
  max_value: (field, [max]) => `This field must be at most ${max} or less`,
  mimes: (field) => `${field} formatı yanlışdır.`,
  min: (field, [length]) =>
    `This field length must contain at least ${length} symbols.`,
  min_value: (field, [min]) => `This field must be at least  ${min} or more`,
  numeric: (field) => `This field must contain only numbers.`,
  regex: (field) => `${field} formatı yanlışdır.`,
  required: (field = "Bu") => `This field is mandatory.`,

  size: (field, [size]) => `${field} size must be ${size}  or less.`,
  url: (field) => `${field} must be entered in the correct URL format`,

  // custom messages
  sharpSymbol: (field) => `${field} was not entered correctly`,
};
