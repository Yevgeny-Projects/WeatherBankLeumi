using BankLeumi.Weather.DAL;
using EnsureThat;

namespace BankLeumi.Weather.BL
{
    /// <summary>
    /// Save customer's action in db
    /// </summary>
    public class ActionLogService : IActionLogService
    {
        #region Fields

        private IActionLogRepository _actionRepository;

        #endregion Fields

        #region Constructor

        public ActionLogService(IActionLogRepository actionRepository)
        {
            Ensure.That(actionRepository, nameof(actionRepository)).IsNotNull();
            _actionRepository = actionRepository;
        }

        #endregion Constructor

        #region Public Methods

        public void InsertActionToDB(DM.ActionLog actionLog)
        {
            _actionRepository.Add(actionLog);
        }

        #endregion Public Methods
    }
}