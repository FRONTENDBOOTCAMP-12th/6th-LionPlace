export function getPbImageURL(item, fileName = 'image') {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
