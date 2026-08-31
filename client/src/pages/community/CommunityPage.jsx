import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertTriangle, Loader2 } from "lucide-react";

import { useAuth } from "@/app/auth";
import { Feed } from "@/features/post";
import {
  useCommunity,
  useJoinCommunity,
  useLeaveCommunity,
  useDeleteCommunity,
} from "@/features/community/hooks";

import {
  CommunityHeader,
  CommunityTabs,
  CommunityAbout,
  CommunityRules,
  CommunityOwner,
  LeaveCommunityModal,
  DeleteCommunityModal,
} from "./ui";

export function CommunityPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("feed");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const communityQuery = useCommunity({ slug });

  const joinMutation = useJoinCommunity();
  const leaveMutation = useLeaveCommunity();
  const deleteMutation = useDeleteCommunity();

  const community = communityQuery.data;

  if (communityQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3">
        <Loader2 className="size-8 text-brand-primary animate-spin" />
        <p className="text-sm font-medium text-content-muted">
          Loading community...
        </p>
      </div>
    );
  }

  if (communityQuery.isError || !community) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="size-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
          <AlertTriangle className="size-8" />
        </div>
        <h2 className="text-xl font-bold text-content-primary mb-2">
          Community Not Found
        </h2>
        <p className="text-sm text-content-muted max-w-sm mb-6">
          This community does not exist or has been removed.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary/90 transition-all cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const currentUserId = user?._id || user?.id;

  const isOwner =
    community.owner?._id === currentUserId ||
    community.owner === currentUserId ||
    community.creator?._id === currentUserId ||
    community.creatorId === currentUserId;

  const isMember = community.members?.some(
    (member) => (member._id ?? member.id ?? member) === currentUserId,
  );

  const handleJoin = () => {
    joinMutation.mutate({ slug });
  };

  const handleLeave = () => {
    leaveMutation.mutate(
      { slug },
      {
        onSuccess: () => {
          setShowLeaveModal(false);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(
      { slug },
      {
        onSuccess: () => {
          setShowDeleteModal(false);
          navigate("/");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-app-bg text-content-primary">
      <CommunityHeader
        community={community}
        isMember={isMember}
        isOwner={isOwner}
        onJoin={handleJoin}
        onLeave={() => setShowLeaveModal(true)}
        onDelete={() => setShowDeleteModal(true)}
        isJoining={joinMutation.isPending}
        isLeaving={leaveMutation.isPending}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <CommunityTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <section className="md:col-span-2 min-w-0">
            {activeTab === "feed" && (
              <Feed
                filters={{ slug }}
                options={{
                  enableCreatePost: isMember,
                }}
              />
            )}

            {activeTab === "rules" && (
              <CommunityRules rules={community.rules} />
            )}

            {activeTab === "about" && (
              <div className="md:hidden">
                <CommunityAbout community={community} />
              </div>
            )}
          </section>

          <aside className="hidden md:flex flex-col gap-5 sticky top-20">
            <CommunityAbout community={community} />
            <CommunityOwner owner={community.owner || community.creator} />
          </aside>
        </div>
      </main>

      <LeaveCommunityModal
        open={showLeaveModal}
        community={community}
        isPending={leaveMutation.isPending}
        onCancel={() => setShowLeaveModal(false)}
        onConfirm={handleLeave}
      />

      <DeleteCommunityModal
        open={showDeleteModal}
        community={community}
        isPending={deleteMutation.isPending}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
