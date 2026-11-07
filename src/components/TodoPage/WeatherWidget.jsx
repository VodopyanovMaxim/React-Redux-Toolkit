import { connect } from "react-redux";
import classNames from "classnames";
import { useState, useEffect } from "react";
import styles from "./WeatherWidget.module.scss";
import { getWeatherThunk } from "../../store/slices/weatherSlice";
import {
  WiThermometerExterior,
  WiThermometer,
  WiStrongWind,
  WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionLeft,
  WiDirectionUpLeft,
  WiDirectionUp,
  WiDirectionUpRight,
  WiDirectionRight,
  WiDirectionDownRight,
} from "react-icons/wi";
import { ClipLoader } from "react-spinners";

function getDirection(angle) {
  var val = Math.floor(angle / 45);
  var arr = [
    <WiDirectionUp />,
    <WiDirectionUpRight />,
    <WiDirectionRight />,
    <WiDirectionDownRight />,
    <WiDirectionDown />,
    <WiDirectionDownLeft />,
    <WiDirectionLeft />,
    <WiDirectionUpLeft />,
  ];
  return arr[val % 8];
}

function WeatherWidget({ weather, getWeather, isFetching, error }) {
  useEffect(() => {
    getWeather();
  }, []);

  const {
    current: { temperature_2m, wind_direction_10m, wind_speed_10m } = {},
    current_units: {
      temperature_2m: temperatureUnit,
      wind_speed_10m: speedUnit,
    } = {},
  } = weather || {};
  const subzero = temperatureUnit === "°C" ? 0 : 32;
  const temperatureIcon =
    temperature_2m > subzero ? <WiThermometer /> : <WiThermometerExterior />;
  const directionIcon = getDirection(wind_direction_10m);

  return (
    <>
      <p className={styles.title}>Daily Weather</p>

      {isFetching && (
        <ClipLoader color="#ffffff" loading={isFetching} size={24} />
      )}
      {error && (
        <p className={styles.error}>Error</p>
      )}
      {!isFetching && !error && weather.current && (
        <>
          <div>
            <p>
              <WiStrongWind />
              {directionIcon}
              {wind_speed_10m} {speedUnit}
            </p>
            <p>
              {temperatureIcon} {temperature_2m} {temperatureUnit}
            </p>
          </div>
        </>
      )}
    </>
  );
}
const mapStateToProps = ({ weatherData }) => weatherData;
const mapDispatchToProps = (dispatch) => ({
  getWeather: () => dispatch(getWeatherThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherWidget);
