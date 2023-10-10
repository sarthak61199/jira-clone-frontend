import axios from "axios";
import qs from "query-string";

import getServerSession from "@/lib/getServerSession";
import FilterSidebar from "@/components/filter-sidebar";
import IssueItem from "@/components/issue-item";

interface IssueList {
  id: number;
  title: string;
  description: string;
  progressId: number;
  priorityId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  priority: {
    id: number;
    label: string;
  };
  progress: {
    id: number;
    label: string;
  };
  user: {
    id: number;
    name: string;
  };
}

const getIssueList = async (
  accessToken: string,
  searchParams: { [key: string]: string | string[] | undefined }
) => {
  const url = qs.stringify(
    {
      order: searchParams.order,
      value: searchParams.value,
      priority: searchParams.priority,
      progress: searchParams.progress,
      user: searchParams.user,
    },
    {
      skipNull: true,
    }
  );
  const { data } = await axios.get(`http://localhost:3001/issue?${url}`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getServerSession();
  const issueList = await getIssueList(
    data?.user?.accessToken || "",
    searchParams
  );

  return (
    <>
      <h2 className="text-center text-4xl font-bold">Issue List</h2>
      <FilterSidebar />
      <div className="my-10 space-y-8">
        {issueList?.map((item: IssueList) => (
          <IssueItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
