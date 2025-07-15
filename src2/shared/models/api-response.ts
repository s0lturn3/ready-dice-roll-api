export class ApiResponse {
  public error: boolean = false;
  public errorMessage: string | null = null;
  public code: number | null = 200;
  public body: any = null;
  public metadata: any = null;
}
