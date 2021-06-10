namespace BankLeumi.Weather.BL
{
    public interface IActionLogService
    {
        void InsertActionToDB(DM.ActionLog actionLog);
    }
}