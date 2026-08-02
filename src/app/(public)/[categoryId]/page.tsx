const Category = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  return <div>{categoryId}</div>;
};

export default Category;