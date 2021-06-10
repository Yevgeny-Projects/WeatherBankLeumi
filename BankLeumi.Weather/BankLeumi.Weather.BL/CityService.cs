using BankLeumi.Weather.DAL;
using EnsureThat;
using System.Collections.Generic;

namespace BankLeumi.Weather.BL
{
    /// <summary>
    /// This class represent city data logic.
    /// </summary>
    public class CityService : ICityService
    {
        #region Fields

        private ICityRepository _cityRepository;

        #endregion Fields

        #region Constructor

        public CityService(ICityRepository cityRepository)
        {
            Ensure.That(cityRepository, nameof(cityRepository)).IsNotNull();
            _cityRepository = cityRepository;
        }

        #endregion Constructor

        #region Public Methods

        public IEnumerable<DM.City> GetAll()
        {
            return _cityRepository.GetAll();
        }

        #endregion Public Methods
    }
}