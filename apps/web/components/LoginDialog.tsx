import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
import { useEffect, useState } from "react";

const LoginDialog = () => {
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const res = await fetch("/api/user");
            const data = await res.json();
            if (!data.user) {
                setOpen(true);
            }
        };
        checkSession();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password }),
            });
            const data = await res.json();
            if (data.success) {
                setOpen(false);
                window.location.reload();
            } else {
                alert("ログインに失敗しました");
            }
        } catch (_error) {
            alert("エラーが発生しました");
        }
        setLoading(false);
    };

    // ダイアログを閉じようとした時の処理
    const handleOpenChange = (isOpen: boolean) => {
        // ダイアログを開く場合は許可
        if (isOpen) {
            setOpen(true);
            return;
        }
        // ダイアログを閉じる操作は無視
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 animate-fade-in" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-6 shadow-xl animate-slide-up">
                    <Dialog.Title className="text-lg font-semibold mb-2">ログイン</Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-500 mb-4">
                        セッションが無効です。ログインしてください。
                    </Dialog.Description>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label.Root htmlFor="userName" className="block text-sm font-medium">
                                ログインID
                            </Label.Root>
                            <input
                                id="userName"
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label.Root htmlFor="password" className="block text-sm font-medium">
                                パスワード
                            </Label.Root>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "ログイン中..." : "ログイン"}
                        </button>
                    </form>

                    {/* <Dialog.Close className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100">
                        <X className="w-4 h-4" />
                    </Dialog.Close> */}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default LoginDialog;
