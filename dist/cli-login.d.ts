export type LoginStatus = 'pending' | 'approved' | 'denied' | 'expired';
export interface StartLoginRequest {
    projectName: string;
    repoUrl?: string;
}
export interface StartLoginResponse {
    deviceCode: string;
    userCode: string;
    approveUrl: string;
    expiresAt: string;
    pollIntervalSeconds?: number;
}
export interface PollLoginResponse {
    status: LoginStatus;
    projectId?: string;
    dashboardUrl?: string;
}
export declare function startBrowserLogin(dashboardUrl: string, request: StartLoginRequest): Promise<StartLoginResponse>;
export declare function pollBrowserLogin(dashboardUrl: string, deviceCode: string): Promise<PollLoginResponse>;
//# sourceMappingURL=cli-login.d.ts.map