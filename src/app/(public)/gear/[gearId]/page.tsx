const SingleGear = async ({
  params,
}: {
  params: Promise<{ gearId: string }>;
}) => {
  const { gearId } = await params;
  return <div>{gearId}</div>;
};

export default SingleGear;
