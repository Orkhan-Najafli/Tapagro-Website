export default {
  _default: (field) => `${field} göstəricisi yanlışdır.`,
  after: (field, [target, inclusion]) =>
    `${field} yalnız ${target} tarixindən sonra${
      inclusion ? `, və ya ${target} tarixində ` : " "
    }olmalıdır.`,
  alpha: (field) => `Bu sahə yalnız hərflərdən ibarət olmalıdır.`,
  alpha_dash: (field) =>
    `${field} yalnız hərflər, rəqəmlər və defisdən ibarət olmalıdır.`,
  // alpha_num: (field) => `${field} yalnız rəqəmlərdən ibarət olmalıdır`,
  alpha_num: (field) =>
    `${field} yalnız hərflər və rəqəmlərdən ibarət olmalıdır`,
  alpha_spaces: (field) =>
    `Bu sahə yalnız hərflərdən və ara simvolundan (space) ibarət olmalıdır.`,
  before: (field, [target, inclusion]) =>
    `${field} yalnız ${target} tarixindən öncə${
      inclusion ? `, və ya ${target} tarixində ` : " "
    }olmalıdır.`,
  between: (field, [min, max]) =>
    `${field} yalnız ${min} və ${max} arası olmalıdır.`,
  confirmed: (field) => `${field} təsdiqləməsi yanlışdır.`,
  credit_card: (field) => `${field} göstəriciləri düzgün daxil olunmayıb.`,
  date_between: (field, [min, max]) =>
    `${field} ${min} və ${max} arası olmalıdır.`,
  date_format: (field, [format]) => `${field} ${format} formatında olmalıdır.`,
  decimal: (field, [decimals = "*"] = []) =>
    `Bu sahə yalnız rəqəmlərdən${
      !decimals || decimals === "*"
        ? ""
        : ` və nöqtədən sonra ${decimals} onluq ədəddən`
    } ibarət olmalıdır.`,
  digits: (field, [length]) => `${field} ${length} rəqəmdən ibarət olmalıdır.`,
  dimensions: (field, [width, height]) =>
    `${field} ölçüsü ${width}x${height} piksel olmalıdır.`,
  email: (field) => `${field} düzgün formatda daxil olunmalıdır.`,
  excluded: (field) => `Eyni seçmək olmaz.`,
  ext: (field) => `${field} düzgün fayl formatında olmalıdır.`,
  image: (field) => `${field} şəkil olmalıdır`,
  included: (field) => `${field} göstəricisi yanlışdır.`,
  integer: (field) => `${field} göstəricisi tam ədəd olmalıdır.`,
  ip: (field) => `${field} IP ünvanı düzgün formatda daxil olunmayıb.`,
  length: (field, [length, max]) => {
    if (max) {
      return `${field} uzunluğu ${length} və ${max} arası olmalıdır.`;
    }

    return `${field} uzunluğu ${length} olmalıdır.`;
  },
  max: (field, [length]) =>
    `Bu sahənin uzunluğu ən çox ${length} simvoldan ibarət olmalıdır.`,
  max_value: (field, [max]) => `Bu sahə ən çox ${max} və ya daha az olmalıdır.`,
  mimes: (field) => `${field} formatı yanlışdır.`,
  min: (field, [length]) =>
    `Bu sahənin uzunluğu ən az ${length} simvoldan ibarət olmalıdır.`,
  min_value: (field, [min]) =>
    `Bu sahə minimum ${min} və ya daha çox olmalıdır.`,
  numeric: (field) => `Bu sahə yalnız tam rəqəmlərdən ibarət olmalıdır.`,
  regex: (field) => `${field} formatı yanlışdır.`,
  required: (field = "Bu") => `Bu sahəni doldurmaq zəruridir.`,
  size: (field, [size]) => `${field} həcmi ${size} və daha az olmalıdır.`,
  url: (field) => `${field} düzgün URL formatında daxil olunmalıdır.`,

  // custom messages
  sharpSymbol: (field) => `${field} düzgün daxil olunmayıb`,
};
