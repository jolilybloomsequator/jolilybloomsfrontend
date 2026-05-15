export default {
  name: 'flower',
  title: 'Flower',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Flower Name',
      type: 'string',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'stemLength',
      title: 'Stem Length',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Feature Flower', value: 'feature' },
          { title: 'Filler Flower', value: 'filler' },
          { title: 'Foliage', value: 'foliage' },
        ],
      },
    },
    {
      name: 'available',
      title: 'Currently Available',
      type: 'boolean',
      initialValue: true,
    },
  ],
}
