export const getS3FileUrl = (fileId: string) => {
  return `${process.env.NEXT_PUBLIC_S3_HOST}/${fileId}`
}
