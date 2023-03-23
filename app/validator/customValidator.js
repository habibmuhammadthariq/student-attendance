const { listGender, listTransactionType, transactionType, studentGender } = require("../helpers/constant")

exports.checkImage = (image, { req }) => {
  const allowed_size = 5 // in mb
  const allowed_extensions = ['image/png', 'image/jpg', 'image/jpeg']
  
  if (req.files.length) {
    const { mimetype, size } = req.files[0]

    if (!allowed_extensions.includes(mimetype)) throw Error('Ekstensi file tidak sesuai')
    if ((size / (1024 * 1024)) > allowed_size) throw Error('Batas ukuran gambar adalah 5 MB')
  }
  return true
}

exports.checkGender = (isMandatory = true) => {
  return (gender) => {
    if (!isMandatory && !gender) return true
    if (!gender) throw new Error('Field gender harus diisi')
    if (!listGender.includes(gender)) throw new Error(`Gender harus berupa ${studentGender.lakilaki} atau ${studentGender.perempuan}`)
    return true
  }

}

exports.checkTransactionType = (isMandatory = true) => {
  return (type) => {
    if (!isMandatory && !type) return true
    if (!type) throw new Error('Field type harus diisi')
    if (!listTransactionType.includes(type)) throw new Error(`Type harus berupa ${transactionType.present} atau ${transactionType.absent}`)
    return true
  }
}