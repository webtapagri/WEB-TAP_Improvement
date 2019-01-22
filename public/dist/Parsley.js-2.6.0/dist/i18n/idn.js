// Validation errors messages for Parsley
// Load this after Parsley

Parsley.addMessages('id', {
  defaultMessage : "Tidak valid",
      type : {
        email : "Email tidak valid",
        url : "Url tidak valid",
        number : "Nomor tidak valid",
        integer : "integeI tidak valid",
        digits : "Harus berupa digit",
        alphanum : "Harus berupa alphanumeric"
      },
      notblank : "Tidak boleh kosong",
      required : "Tidak boleh kosong",
      pattern : "Tidak valid",
      min : "Harus lebih besar atau sama dengan %s.",
      max : "Harus lebih kecil atau sama dengan %s.",
      range : "Harus dalam rentang %s dan %s.",
      minlength : "Minimal %s karakter atau lebih.",
      maxlength : "Maksimal %s karakter atau kurang.",
      length : "Panjang karakter harus dalam rentang %s dan %s",
      mincheck : "Pilih minimal %s pilihan",
      maxcheck : "Pilih maksimal %s pilihan",
      check : "Pilih antara %s dan %s pilihan",
      equalto : "Harus sama"
});

Parsley.setLocale('id');
