const {t} = useI18n()
export const validateAlphaSpaces = (_: any, value: any) => {
    const alphaSpacesRegex = /^[a-zA-Z\s]+$/; // Yalnız hərf və boşluqlar üçün regex
    if (!alphaSpacesRegex.test(value)) {
      return Promise.reject(new Error(t("only_alpha_spaces")));
    }
    if (value.length < 3 || value.length > 255) {
      return Promise.reject(
        new Error(t("length_should_be_between_3_and_255"))
      );
    }
    return Promise.resolve();
  }