import { useTranslation } from "react-i18next";
import { memo } from "react";

const PrivacyPage = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col items-center relative overflow-hidden py-24 px-4">
            <div className="z-10 w-full max-w-5xl px-4 text-left">
                <div className="mb-8 text-center">
                    <h1
                        className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400 leading-tight"
                        style={{ fontFamily: "Henny Penny" }}
                    >
                        {t("privacyPage.title")}
                    </h1>
                    <p className="text-zinc-400 text-sm mt-2">
                        {t("privacyPage.subtitle")}
                    </p>
                </div>
                <div className="text-zinc-300 text-sm leading-relaxed space-y-6">
                    <p>{t("privacyPage.intro")}</p>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            {t("privacyPage.geminiSection.title")}
                        </h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t("privacyPage.geminiSection.content"),
                            }}
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            {t("privacyPage.dataSentSection.title")}
                        </h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    "privacyPage.dataSentSection.content"
                                ),
                            }}
                        />
                        <ul className="list-disc list-inside ml-4 text-zinc-400 space-y-1 mt-2">
                            {t("privacyPage.dataSentSection.bullets", {
                                returnObjects: true,
                            }).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <p
                            className="mt-2"
                            dangerouslySetInnerHTML={{
                                __html: t("privacyPage.dataSentSection.note"),
                            }}
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            {t("privacyPage.googleDisclaimer.title")}
                        </h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    "privacyPage.googleDisclaimer.content"
                                ),
                            }}
                        />
                        <p className="mt-4 font-semibold text-red-400">
                            {t("privacyPage.googleDisclaimer.warning")}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            {t("privacyPage.localProcessing.title")}
                        </h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    "privacyPage.localProcessing.content"
                                ),
                            }}
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            {t("privacyPage.policyChanges.title")}
                        </h2>
                        <p>{t("privacyPage.policyChanges.content")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(PrivacyPage);
