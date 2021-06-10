using System;

namespace BankLeumi.Weather.DM
{
    public class ActionLog
    {
        #region Properties

        public virtual int Id { get; set; }
        public virtual DateTime Date { get; set; }

        public virtual string Action { get; set; }

        public virtual Int64? UserId { get; set; }

        public virtual string Details { get; set; }

        #endregion Properties

        #region Constructors

        public ActionLog()
        {
        }

        public override bool Equals(object obj)
        {
            if (obj is ActionLog)
            {
                ActionLog other = (ActionLog)obj;

                return
                    this.Id == other.Id;
            }
            else return false;
        }

        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }

        #endregion Constructors
    }
}