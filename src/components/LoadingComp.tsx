import React from "react";

function LoadingComp({ isLoading }: { isLoading: boolean }): React.JSX.Element {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-x-2">
      {isLoading && (
        <>
          <div className="w-16 h-16 border-t-2 border-gray-900 rounded-full animate-spin"></div>
          <p className="mt-8">로그인 중입니다...</p>
        </>
      )}
    </div>
  );
}

export default LoadingComp;
