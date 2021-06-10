namespace BankLeumi.Weather.DM
{
    public class City
    {
        public virtual int Id { get; set; }
        public virtual string StateName { get; set; }
        public virtual string ShortStateName { get; set; }
        public virtual string StateCode { get; set; }
        public virtual string Name { get; set; }
        public virtual string Zip { get; set; }

        public override bool Equals(object obj)
        {
            if (obj is City)
            {
                City other = (City)obj;

                return
                    this.Id == other.Id;
            }
            else return false;
        }

        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }
    }
}