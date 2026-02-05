import { Down } from "@/assets/icons";
import DropDown from "@/components/common/DropDown";
import useClickOutside from "@/hooks/useClickOutside";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface InvitedUserItemProps {
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    permission: string;
  };
}

const InvitedUserItem = ({ user }: InvitedUserItemProps) => {
  const [currentPermission, setCurrentPermission] = useState(user.permission);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPermission(user.permission);
  }, []);

  useEffect(() => {
    if (currentPermission) {
      setTimeout(() => {
        setIsDropDownOpen(false);
      }, 100);
    }
  }, [currentPermission]);
  useClickOutside(dropdownRef, () => setIsDropDownOpen(false), isDropDownOpen);

  console.log(currentPermission);

  return (
    <div
      key={user.id}
      className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]"
    >
      <div className="flex w-[352px] items-start gap-2 pl-2 pr-0 py-1.5 relative">
        <img
          className="relative w-6 h-6 object-cover rounded-full"
          alt={`${user.name} 프로필`}
          src={user.avatar}
        />

        <div className="inline-flex flex-col items-start justify-center relative flex-[0_0_auto]">
          <div className="mt-[-1.00px] Body_3_medium text-Grey-100 relative w-fit whitespace-nowrap ">
            {user.name}
          </div>

          <div className="relative w-fit Caption_medium text-Grey-300">
            {user.email}
          </div>
        </div>
      </div>

      <DropDown
        type="auth"
        ref={dropdownRef}
        currentState={currentPermission}
        setCurrentState={setCurrentPermission}
        isOpen={isDropDownOpen}
        setIsOpen={setIsDropDownOpen}
      >
        {currentPermission}
      </DropDown>
    </div>
  );
};

export default InvitedUserItem;
