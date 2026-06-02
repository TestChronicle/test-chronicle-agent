export declare const VERCEL_PROTECTION_BYPASS_HEADER = "x-vercel-protection-bypass";
export declare const VERCEL_PROTECTION_BYPASS_PARAM = "x-vercel-protection-bypass";
export declare const VERCEL_SET_BYPASS_COOKIE_PARAM = "x-vercel-set-bypass-cookie";
export declare function vercelProtectionBypassFromEnv(env: NodeJS.ProcessEnv): string | undefined;
export declare function withVercelProtectionBypassHeader(headers: Record<string, string>, vercelProtectionBypass?: string): Record<string, string>;
export declare function withVercelProtectionBypassQuery(url: string, vercelProtectionBypass?: string, setBypassCookie?: boolean): string;
export declare function isVercelAuthenticationResponse(status: number, body: string): boolean;
export declare function vercelAuthenticationError(action: string): Error;
//# sourceMappingURL=vercel-protection.d.ts.map